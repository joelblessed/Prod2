import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadCartAfterLogin } from "../../cartAction";
import {
  DashboardContainer,
  Sidebar,
  MainContent,
  NavLink,
  LogoutButton,
  Card,
  Grid,
  Header,
  ProfileContainer,
  ProfileImage,
  EditButton,
  DeleteButton,
  EditProfileForm,
  FormLabel,
  FormButton,
  ChartPlaceholder,
} from "./dashboardStyles";



const Profile = ({ api, user, error, useDispatch }) => {
  // const [user, setUser] = useState(null);
  // const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false); // Fix typo in state variable name
  const { t } = useTranslation();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     setError("No token found");
  //     return;
  //   }

  //   fetch(`${api}/profile`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch user data");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setUser(data);
  //     })
  //     .catch((error) => setError(error.message));
  // }, []);

  if (error)
    return (
      <p>
        {t("Error")}: {error}
      </p>
    );
  if (!user) return <p>{t("Loading...")}</p>;

  return (
    <ProfileContainer>
      <h2>{t("User Profile")}</h2>
      <div>
        {imageError ? ( // Fix typo in state variable usage
          <NavLink to="/deditProfilePicture">
            <ProfileImage
              src={
                user.gender === "male"
                  ? "/images/svgviewer-output(2).svg"
                  : "/images/svgviewer-output(3).svg"
              }
              alt="loading..."
            />
          </NavLink>
        ) : (
          <NavLink to="/deditProfilePicture">
            <ProfileImage
              src={user.profileImage}
              alt=""
              onError={() => setImageError(true)} // Fix typo in state variable usage
            />
          </NavLink>
        )}
      </div>

      <p>
        <strong>{t("User Name")}:</strong> {user.userName}
      </p>
      <p>
        <strong>{t("Full Names")}:</strong> {user.fullName}
      </p>
      <p>
        <strong>{t("Phone Number")}:</strong> {user.phone}
      </p>
      <p>
        <strong>{t("Email")}:</strong> {user.email}
      </p>
      <p>
        <strong>{t("Country")}:</strong> {user.country}
      </p>
      <p>
        <strong>{t("Address")}:</strong> {user.address}
      </p>

      <div>
        <EditButton to="/editProfile">{t("Edit Profile")}</EditButton>
      </div>
    </ProfileContainer>
  );
};


export default Profile;
