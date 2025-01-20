import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/prisma.services';
import { OAuth2Client } from 'google-auth-library';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private client: OAuth2Client;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyGoogleToken(token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      return payload;
    } catch (error) {
      console.error(error);
    }
  }

  async signToken(payloadJwt: any) {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new UnauthorizedException('JWT_SECRET no configurado');
    }

    return await this.jwtService.signAsync(payloadJwt, {
      secret: jwtSecret,
    });
  }

  async loginWithGoogle(credential: CreateAuthDto) {
    const payload = await this.verifyGoogleToken(credential.credential);
    if (!payload) {
      throw new Error('Invalid google token');
    }
    const {
      email,
      email_verified,
      name,
      picture,
      given_name,
      family_name,
      sub: google_id,
    } = payload;

    let user = await this.prisma.user.findUnique({
      where: { google_id: google_id },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          google_id: google_id,
          email: email,
          first_name: given_name,
          last_name: family_name,
          picture: picture,
          full_name: name,
          email_verified: email_verified,
        },
      });
    }

    const payloadJwt = { sub: user.id, email: user.email };

    return { access_token: await this.jwtService.signAsync(payloadJwt) };
  }
}
