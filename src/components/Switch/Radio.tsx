import { ReactNode } from 'react';

/** Props */
interface Props {
  value: boolean;
  setValue: (bool: boolean) => void;

  label?: string;
  labelExtra?: ReactNode;
  className?: string;
}

/** Component */
export const Radio = (props: Props) => {
  /** Template */
  return (
    <span className={`w-fit flex-align-x cursor-pointer select-none ${props.className}`} onClick={() => props.setValue(!props.value)}>
      {/* icon */}
      <span
        className={`w-18 h-18 -mb-2 relative border rounded-full duration-300
          ${props.value ? 'border-primary-1' : 'border-black'}
        `}
      >
        <span
          className={`w-10 h-10 absolute position-center rounded-full duration-300
            ${props.value ? 'bg-primary-1' : 'bg-transparent'}
          `}
        ></span>
      </span>

      {/* label */}
      {props.label && (
        <span
          className={`flex-align-x ml-6 font-lg thin duration-300
          ${props.value ? 'text-second-3' : 'text-common-1'}
        `}
        >
          {props.label} {props.labelExtra}
        </span>
      )}
    </span>
  );
};
