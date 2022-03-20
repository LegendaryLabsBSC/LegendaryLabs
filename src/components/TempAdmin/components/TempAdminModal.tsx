import React from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from "@chakra-ui/react";

type TempAdminModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  form?: any;
};

const TempAdminModal = ({
  isOpen,
  onClose,
  title,
  form,
}: TempAdminModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{form}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TempAdminModal;
