import { Select, Option, SelectProps } from "@material-tailwind/react";
import { FC } from "react";

interface IMySelectProps extends SelectProps {
  options?: Array<string>
}

const mySelect: FC<IMySelectProps> = (props) => {
  return (
    <Select {...props}>
      {props.options?.length && props.options.map(o => <Option>{o}</Option>)}
    </Select>
  );
};

export default mySelect;