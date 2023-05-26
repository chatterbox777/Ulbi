import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback } from "react";

import { getLoginState } from "features/AuthByUsername/model/selectors/getLoginState/getLoginState";
import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername/loginByUsername";
import { loginActions } from "features/AuthByUsername";

import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";

import { Text, TextTheme } from "shared/ui/Text/Text";
import cls from "./LoginForm.module.scss";

interface LoginFormProps {
  className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { username, password, isLoading, error } = useSelector(getLoginState);

  const onChangeUsername = useCallback(
    (userName: string) => {
      dispatch(loginActions.setUsername(userName));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (password: string) => {
      dispatch(loginActions.setPassword(password));
    },
    [dispatch]
  );

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, password, username]);

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={t("authorizationForm")} />
      {error && <Text theme={TextTheme.ERROR} text={error} />}
      <Input
        autofocus
        type="text"
        className={cls.input}
        placeholder={t("Введите username")}
        onChange={onChangeUsername}
        value={username}
      />
      <Input
        type="password"
        className={cls.input}
        placeholder={t("Введите пароль")}
        onChange={onChangePassword}
        value={password}
      />
      {isLoading && <div>...Loading</div>}
      <Button
        theme={ButtonTheme.OUTLINE}
        className={cls.loginBtn}
        disabled={isLoading}
        onClick={onLoginClick}
      >
        {t("Войти")}
      </Button>
    </div>
  );
});
