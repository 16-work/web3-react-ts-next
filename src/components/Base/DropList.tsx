import { Option } from '@/types/common';
import { Popover, PopoverProps } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import { ReactNode, useMemo, useRef, useState } from 'react';
import { NoData } from './NoData';

const styleType = {
  base: {
    triggerBox: 'w-fit',
    triggerArrow: 'hidden',
    list: 'max-h-300 ',
    option: 'px-20 py-10 text-common-1 hover-primary font-base',
    activeOption: 'bg-primary-1 !text-common-1',
    hr: '',
  },
  second: {
    triggerBox: '',
    triggerArrow: 'xs:w-28 md:w-24',
    list: 'min-w-200 min-h-180 ',
    option: '',
    activeOption: '',
    hr: '',
  },
};

/** Props */
interface Props extends Omit<PopoverProps, 'children' | 'arrow'> {
  type?: keyof typeof styleType;
  children: (option: Option) => ReactNode;
  value: any;
  options: Option[];
  onSelect: (value: any) => void;

  cusOption?: (option: Option, index: number) => ReactNode;
  placement?: TooltipPlacement;
  triggerId?: string;
}

/** Component */
export const DropList = (props: Props) => {
  /** Params */
  const trigger = props.trigger ?? ['hover'];

  const className = useMemo(() => {
    return styleType[props.type ?? 'base'];
  }, [props.type]);

  const [open, setOpen] = useState(false);
  const parentRef: any = useRef(null);
  const parentWidth = useMemo(() => {
    return parentRef && parentRef.current?.offsetWidth;
  }, [parentRef, open]);

  /** Actions */
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  /** Template */
  return (
    <Popover
      placement={props.placement}
      trigger={trigger}
      arrow={false}
      open={open}
      onOpenChange={handleOpenChange}
      getPopupContainer={() => (props.triggerId ? document.getElementById(props.triggerId)! : document.body)}
      styles={{ root: { minWidth: parentWidth } }}
      content={
        <div className={`relative grid grid-cols-1 overflow-auto ${className.list}`}>
          {props.options.map((option, index) => (
            <div key={index}>
              {/* hr */}
              {index !== 0 && <div className={className.hr}></div>}

              {/* option */}
              <div
                onClick={() => {
                  props.onSelect(option.value);
                  setOpen(false);
                }}
                className={`${className.option} cursor-pointer
                    ${props.value === option.value ? className.activeOption : ''}
                  `}
              >
                <div className={`group flex-align-x block w-full`}>
                  {(props.cusOption && props.cusOption(option, index)) ?? (
                    <>
                      {option.prefixIcon && option.prefixIcon}
                      {option.label}
                      {option.suffixIcon && option.suffixIcon}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {props.options.length === 0 && <NoData />}
        </div>
      }
    >
      <div
        ref={parentRef}
        id={props.triggerId}
        onClick={() => setOpen(true)}
        className={`flex-align-x justify-between cursor-pointer duration-300 ${className.triggerBox}`}
      >
        {/* current value */}
        {props.children(props.options.find((item) => item.value === props.value) ?? { label: '', value: undefined })}
      </div>
    </Popover>
  );
};
