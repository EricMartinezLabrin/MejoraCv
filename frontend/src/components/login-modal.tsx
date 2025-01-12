"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "@/api/backend";
import { Credential } from "@/lib/types";

export default function LoginModal({
  session,
  openDrawer = false,
  setOpenDrawer,
}: any) {
  const saveToken = (token: Credential) => {
    googleLogin(token).then((response) => {
      localStorage.setItem("token", response?.access_token);
      if (response?.access_token) {
        session(response?.access_token);
      }
    });
  };
  return (
    <Drawer open={openDrawer}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Por favor inicia sesión</DrawerTitle>
          <DrawerDescription>
            Para usar esta funcion es necesario iniciar sesión con google.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                saveToken({ credential: credentialResponse.credential });
              } else {
                console.error("Credential is undefined");
              }
            }}
            onError={() => {
              console.error("Login Failed");
            }}
            useOneTap
          />
          <DrawerClose>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.location.reload()}
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
