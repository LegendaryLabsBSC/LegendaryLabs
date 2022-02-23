import React, { useState } from "react";
import { Button, Center, useDisclosure } from "@chakra-ui/react";
import TempAdminModal from "./components/TempAdminModal";
import CreatePromoForm from "./forms/CreatePromoForm";

type AdminForm = {
  title: string;
  form: any;
};

const TempAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [adminForm, setAdminForm] = useState<AdminForm>();

  const showFormModal = ({ title, form }: AdminForm) => {
    setAdminForm({ title: title, form: form });
    onOpen();
  };

  return (
    <Center>
      <Button
        onClick={() =>
          showFormModal({
            title: "Create Promo Event",
            form: <CreatePromoForm />,
          })
        }
      >
        Create Promo
      </Button>
      <TempAdminModal
        isOpen={isOpen}
        onClose={onClose}
        title={adminForm?.title}
        form={adminForm?.form}
      />
    </Center>
  );
};

export default TempAdmin;
