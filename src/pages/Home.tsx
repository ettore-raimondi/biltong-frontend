import { useState } from "react";
import { CreateBatchDialog } from "../components/CreateBatchDialog";
import { Sidebar } from "../components/layout/Sidebar";
function Home() {
  const [showCreateBatchDialog, setShowCreateBatchDialog] = useState(false);

  return (
    <>
      <Sidebar handleCreateBatch={() => setShowCreateBatchDialog(true)} />
      <CreateBatchDialog
        visible={showCreateBatchDialog}
        onHide={() => setShowCreateBatchDialog(false)}
      />
    </>
  );
}

export default Home;
