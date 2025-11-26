import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import { clearAuthToken } from "../../helpers/auth-helpers";

export function Sidebar({
  handleCreateBatch,
}: {
  handleCreateBatch: () => void;
}) {
  const navigate = useNavigate();

  const items = [
    {
      label: "Biltong App",
      items: [
        {
          label: "Home",
          icon: "pi pi-fw pi-home",
          command: () => navigate(`/home`),
        },
        {
          label: "Create batch",
          icon: "pi pi-fw pi-plus",
          command: handleCreateBatch,
        },
        {
          label: "Help",
          icon: "pi pi-fw pi-question",
          command: () => console.log("Help"),
        },
        {
          label: "Logout",
          icon: "pi pi-fw pi-sign-out",
          command: () => {
            clearAuthToken();
            navigate(`/login`);
          },
        },
      ],
    },
  ];

  return (
    <div className="full-height flex">
      <Menu model={items} className="w-full md:w-15rem h-screen" />
    </div>
  );
}
