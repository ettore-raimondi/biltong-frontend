import { Menu } from "primereact/menu";

export function Sidebar({
  handleCreateBatch,
}: {
  handleCreateBatch: () => void;
}) {
  const items = [
    {
      label: "Biltong App",
      items: [
        {
          label: "Home",
          icon: "pi pi-fw pi-home",
          command: () => console.log("Home"),
        },
        {
          label: "Create batch",
          icon: "pi pi-fw pi-plus",
          command: handleCreateBatch,
        },
      ],
    },
  ];

  return (
    <div className="full-height flex">
      <Menu model={items} className="w-full md:w-15rem h-screen" />
      <div className="flex flex-column align-items-center justify-content-center h-full w-full p-15">
        <h1>Welcome to the Biltong App</h1>
      </div>
    </div>
  );
}
