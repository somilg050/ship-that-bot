import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const SignUpModal: React.FC<ModalProps> = ({ isOpen, onClose, onClick }) => {
  const focusRef = React.useRef(null);
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        initialFocusRef={focusRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an account to continue</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="1rem">
              🚀 Launch your AI chatbot in hours, not days, using ShipThatBot
              Next.js boilerplate.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClick} ref={focusRef}>
              Sign Up
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const StartNowModal: React.FC<ModalProps> = ({ isOpen, onClose, onClick }) => {
  const focusRef = React.useRef(null);
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        initialFocusRef={focusRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome to ShipThatBot</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="1rem">
              🚀 Launch your AI chatbot in hours, not days, using ShipThatBot
              Next.js boilerplate. <br />
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              bgColor={"teal.500"}
              color={"white"}
              mr={3}
              onClick={onClick}
              ref={focusRef}
              _hover={{
                opacity: 0.9,
                bgColor: "teal.600",
                transform: "scale(1.01)",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              Sign Up
            </Button>
            <Button variant="outline" onClick={onClick}>
              Sign in
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const FullAccessModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const focusRef = React.useRef(null);
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        initialFocusRef={focusRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Loved ShipThatBot?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="1rem">
              Use ShipThatBot to launch AI chatbots swiftly and efficiently. You
              can leverage this place to put a reach out email or book a meeting
              link.
              <br />
              <br />
              <b>Reach out to us for full access! 🎉 </b>
            </Text>
          </ModalBody>

          <ModalFooter
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Button
              as="a"
              href="https://your-calender-link.com"
              onClick={(e) => {
                window.open("https://your-calender-link.com", "_blank");
                e.preventDefault(); // Prevent the default anchor tag behaviour
              }}
              width="100%"
              bgColor={"teal.500"}
              color={"white"}
              mb={3}
              ref={focusRef}
              _hover={{
                opacity: 0.9,
                bgColor: "teal.600",
                transform: "scale(1.01)",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              Book a meeting
            </Button>
            <Button
              as="a"
              href="mailto:hello@nomadicbug.com"
              onClick={(e) => {
                window.open("mailto:hello@nomadicbug.com", "_blank");
                e.preventDefault(); // Prevent the default anchor tag behaviour
              }}
              width="100%"
              variant="outline"
            >
              Contact us
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { StartNowModal, SignUpModal, FullAccessModal };
