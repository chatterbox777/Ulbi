import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { useDispatch } from "react-redux";
import { memo, useCallback } from "react";
import { loginActions } from "features/AuthByUsername/model/slice/loginSlice";
import cls from "./LoginForm.module.scss";

interface LoginFormProps {
  className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onChangeUsername = useCallback(
    (userName: string) => {
      dispatch(loginActions.setUsername(userName));
    },
    [dispatch]
  );

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input
        autofocus
        type="text"
        className={cls.input}
        placeholder={t("Введите username")}
        onChange={onChangeUsername}
      />
      <Input
        type="text"
        className={cls.input}
        placeholder={t("Введите пароль")}
      />
      <Button theme={ButtonTheme.OUTLINE} className={cls.loginBtn}>
        {t("Войти")}
      </Button>
    </div>
  );
});
