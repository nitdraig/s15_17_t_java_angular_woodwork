import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function Terms() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className="bg-transparent text-white ">
        Términos y condiciones
      </Button>
      <Modal
        size={"lg"}
        scrollBehavior={"inside"}
        isOpen={isOpen}
        backdrop="opaque"
        onOpenChange={onOpenChange}
        isDismissable={true}
        isKeyboardDismissDisabled={true}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Términos y Condiciones de WoodWork
              </ModalHeader>
              <ModalBody>
                <p>
                  <span className="font-bold">¡Bienvenido a WoodWork!</span>
                  <br />
                  WoodWork es una plataforma que busca conectar a trabajadores
                  independientes, emprendedores y pequeñas empresas con espacios
                  de coworking disponibles. Al utilizar nuestra plataforma,
                  aceptas cumplir con los siguientes términos y condiciones. Si
                  no estás de acuerdo con estos términos, no utilices nuestra
                  plataforma.
                </p>
                <p>
                  <span className="font-bold">1. Definiciones</span>
                  <br />- <span className="font-bold">Plataforma:</span> El
                  sitio web y la aplicación móvil de WoodWork.
                  <br />- <span className="font-bold">Usuario:</span> Cualquier
                  persona que utilice la Plataforma.
                  <br />-{" "}
                  <span className="font-bold">Proveedor de Espacios:</span>{" "}
                  Personas, emprendedores o empresas que ofrecen espacios de
                  coworking a través de la Plataforma.
                  <br />- <span className="font-bold">Reserva:</span> El proceso
                  de reservar un espacio de coworking a través de la Plataforma.
                </p>
                <p>
                  <span className="font-bold">2. Uso de la Plataforma</span>
                  <br />
                  2.1. <span className="font-bold">Elegibilidad:</span> Para
                  utilizar la Plataforma, debes tener al menos 18 años de edad y
                  la capacidad legal para formar contratos vinculantes.
                  <br />
                  2.2. <span className="font-bold">Cuenta:</span> Debes crear
                  una cuenta para acceder a ciertas funciones de la Plataforma.
                  Eres responsable de mantener la confidencialidad de tu cuenta
                  y contraseña, y aceptas notificar a WoodWork inmediatamente
                  sobre cualquier uso no autorizado de tu cuenta.
                  <br />
                  2.3.{" "}
                  <span className="font-bold">
                    Precisión de la Información:
                  </span>{" "}
                  Aceptas proporcionar información precisa, actual y completa
                  durante el proceso de registro y mantener actualizada dicha
                  información.
                </p>
                <p>
                  <span className="font-bold">3. Reservas</span>
                  <br />
                  3.1. <span className="font-bold">
                    Proceso de Reserva:
                  </span>{" "}
                  Puedes reservar espacios de coworking disponibles a través de
                  la Plataforma. Las condiciones específicas de cada reserva,
                  incluyendo el precio y la política de cancelación, estarán
                  disponibles antes de confirmar la reserva.
                  <br />
                  3.2.{" "}
                  <span className="font-bold">
                    Confirmación de Reserva:
                  </span>{" "}
                  Una vez que realices una reserva, recibirás una confirmación
                  por correo electrónico. La reserva no será considerada
                  completa hasta que recibas esta confirmación.
                  <br />
                  3.3.{" "}
                  <span className="font-bold">
                    Cancelaciones y Reembolsos:
                  </span>{" "}
                  Las políticas de cancelación y reembolso varían según el
                  Proveedor de Espacios. Asegúrate de revisar estas políticas
                  antes de realizar una reserva.
                </p>
                <p>
                  <span className="font-bold">4. Obligaciones del Usuario</span>
                  <br />
                  4.1. <span className="font-bold">Comportamiento:</span>{" "}
                  Aceptas utilizar la Plataforma de manera respetuosa y conforme
                  a la ley. No debes realizar ninguna acción que pueda dañar,
                  desactivar, sobrecargar o deteriorar la Plataforma.
                  <br />
                  4.2. <span className="font-bold">
                    Contenido del Usuario:
                  </span>{" "}
                  Eres responsable de cualquier contenido que publiques o envíes
                  a través de la Plataforma. No debes publicar contenido que sea
                  ilegal, ofensivo, difamatorio o que infrinja los derechos de
                  terceros.
                </p>
                <p>
                  <span className="font-bold">
                    5. Obligaciones del Proveedor de Espacios
                  </span>
                  <br />
                  5.1.{" "}
                  <span className="font-bold">
                    Precisión de la Información:
                  </span>{" "}
                  Los Proveedores de Espacios deben proporcionar información
                  precisa y completa sobre los espacios de coworking que
                  ofrecen.
                  <br />
                  5.2. <span className="font-bold">
                    Cumplimiento de Leyes:
                  </span>{" "}
                  Los Proveedores de Espacios deben cumplir con todas las leyes
                  y regulaciones aplicables a la oferta y uso de sus espacios de
                  coworking.
                </p>
                <p>
                  <span className="font-bold">
                    6. Limitación de Responsabilidad
                  </span>
                  <br />
                  WoodWork no garantiza la disponibilidad de ningún espacio de
                  coworking y no será responsable de ningún daño directo,
                  indirecto, incidental, especial o consecuente que surja del
                  uso de la Plataforma o de la incapacidad para utilizarla.
                </p>
                <p>
                  <span className="font-bold">
                    7. Modificaciones de los Términos
                  </span>
                  <br />
                  WoodWork se reserva el derecho de modificar estos términos en
                  cualquier momento. Te notificaremos sobre cualquier cambio
                  significativo en los términos. El uso continuo de la
                  Plataforma después de tales cambios constituye tu aceptación
                  de los términos modificados.
                </p>
                <p>
                  <span className="font-bold">
                    8. Ley Aplicable y Jurisdicción
                  </span>
                  <br />
                  Estos términos se regirán e interpretarán de acuerdo con las
                  leyes de [Tu país/estado]. Cualquier disputa que surja en
                  relación con estos términos estará sujeta a la jurisdicción
                  exclusiva de los tribunales de [Tu país/estado].
                </p>
                <p>
                  <span className="font-bold">9. Contacto</span>
                  <br />
                  Si tienes alguna pregunta sobre estos términos, por favor
                  contacta a WoodWork en [Correo electrónico de contacto].
                </p>
                <p className="font-thin">
                  Al utilizar los servicios de WoodWork, reconoces haber leído,
                  comprendido y aceptado estos términos y condiciones en su
                  totalidad. Si tienes alguna pregunta o inquietud con respecto
                  a estos términos, no dudes en contactarnos. ¡Gracias por
                  confiar en WoodWork!
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
