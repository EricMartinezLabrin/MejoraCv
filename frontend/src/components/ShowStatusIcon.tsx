import CheckIcon from "@/components/icons/check";
import DangerIcon from "@/components/icons/danger";
import CautionIcon from "@/components/icons/caution";

const ShowStatusIcon = (props: any) => {
  const { score } = props;
  const green = score >= 4 ? "flex" : "hidden";
  const yellow = score === 2 || score === 3 ? "flex" : "hidden";
  const red = score === 1 ? "flex" : "hidden";

  return (
    <div>
      <div
        className={`bg-green-500 rounded-full size-11 text-heading-1 p-1 ${green} justify-center items-center`}
      >
        <CheckIcon strokeWidth="3" />
      </div>
      <div
        className={`bg-red-500 rounded-full size-11 text-heading-1 p-1 ${red} justify-center items-center`}
      >
        <DangerIcon strokeWidth="3" />
      </div>
      <div
        className={`bg-yellow-500 rounded-full size-11 text-heading-1 p-1 ${yellow} justify-center items-center`}
      >
        <CautionIcon strokeWidth="3" />
      </div>
    </div>
  );
};

export default ShowStatusIcon;
