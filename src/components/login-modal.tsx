import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Link,
} from "@nextui-org/react";

import Login from "./login";

import { siteConfig } from "@/config/site";

export default function LoginModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="border-main-dark-blue text-main-dark-blue dark:text-white dark:border-white"
        variant="bordered"
        onPress={onOpen}
      >
        <Link
          className="text-main-main-dark-blue md:hidden"
          href={siteConfig.links.login.href}
        >
          Iniciar sesión
        </Link>

        <span className="hidden md:inline">Iniciar sesión</span>
      </Button>

      <Modal
        className="z-[999]"
        isOpen={isOpen}
        placement="center"
        size="5xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody className="p-0 flex flex-row">
              <img alt="" className="hidden md:block w-1/2" src="/icon.jpeg" />

              <Login onClose={onClose} />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
