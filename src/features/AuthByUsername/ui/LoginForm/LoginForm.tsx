import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import { memo, useCallback } from "react";

import { getLoginState } from "features/AuthByUsername/model/selectors/getLoginState/getLoginState";
import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername/loginByUsername";
import { loginActions } from "features/AuthByUsername";

import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";

import { Text, TextTheme } from "shared/ui/Text/Text";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { loginReducer } from "features/AuthByUsername/model/slice/loginSlice";
import { useAppDispatch } from "shared/lib/hooks";
import cls from "./LoginForm.module.scss";

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = { loginForm: loginReducer };

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { username, password, isLoading, error } =
    useSelector(getLoginState) || {};

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

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === "fulfilled") {
      onSuccess();
    }
  }, [dispatch, onSuccess, password, username]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
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
    </DynamicModuleLoader>
  );
});

export default LoginForm;
