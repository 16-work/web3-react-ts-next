'use client';

import { useForm } from '@/hooks/useForm';
import { useTranslation } from '@/hooks/useTranslation';
import { useLockFn } from '@/utils/ahooks';
import { tools } from '@/utils/tools';
import yup from '@/utils/yup';
import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { FieldItem } from '../Box/FieldItem';
import { UploadImg } from '../Upload/UploadImg';
import { Button } from '../Base/Button';

interface DTOForm {
  name: string;
  icon: string;
}

/** Component */
export const FormDemo = () => {
  /** Retrieval */
  const { t } = useTranslation();

  /** Params */
  const schema = useMemo(() => {
    return {
      name: yup.string().required().label('name'),
      icon: yup.string().label('icon'),
    };
  }, [t]);

  const { fields, beforeSubmit, errors, errorMsg, control, setValue } = useForm<DTOForm>(schema, {});

  const icon = useWatch({ control, name: 'icon' });

  const btnInfo = useMemo(() => {
    let text = '';
    let disabled = true;

    if (errorMsg) text = errorMsg;
    else {
      disabled = false;
      text = 'Submit';
    }

    return { text, disabled };
  }, [errorMsg, t]);

  /** Actions */
  const { run: onSubmit, task } = useLockFn(async () => {
    /* before */

    /* main */
    await tools.sleep(2000);

    /* success */
    task.status = 1;
  });

  /** Template */
  return (
    <div className="box-form">
      {/* item: name */}
      <FieldItem label={'Name'} errorMsg={errors.name?.message}>
        <input autoComplete="off" className="input-name    input-1" {...fields('name')} />
      </FieldItem>

      {/* item: icon */}
      <FieldItem label={'Icon'} errorMsg={errors.icon?.message}>
        <UploadImg img={icon} setImg={(base64: string) => setValue('icon', base64)} uploadType="single" className="input-icon    input-1" />
      </FieldItem>

      {/* btn: submit */}
      <Button auth isDisabled={btnInfo.disabled} isLoading={task.status === 0} onClick={beforeSubmit(onSubmit)} className="btn-create    btn-primary">
        {btnInfo.text}
      </Button>
    </div>
  );
};
