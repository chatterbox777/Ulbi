import { classNames } from "shared/lib/classNames/classNames";

import { useTranslation } from "react-i18next";
import { DynamicModuleLoader } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { profileReducer } from "entities/Profile";
import cls from "./ProfilePage.module.scss";

interface ProfilePageProps {
  className?: string;
}
const reducersList = {
  profile: profileReducer,
};

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { t } = useTranslation();

  return (
    <DynamicModuleLoader reducers={reducersList} removeAfterUnmount>
      <div className={classNames(cls.ProfilePage, {}, [className])}>
        {t("PROFILE PAGE")}
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
