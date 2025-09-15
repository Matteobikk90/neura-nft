type ModalPayloadMap = {
  qr: { address: string };
  confirm: { title: string; onConfirm: () => void };
  filter: object;
  mint: { collectionId?: string } | undefined;
};

type ModalType = keyof ModalPayloadMap;

export type ModalSliceType<T extends ModalType = ModalType> = {
  type: T | null;
  data: ModalPayloadMap[ModalType] | null;
  openModal: <K extends ModalType>(type: K, data: ModalPayloadMap[K]) => void;
  closeModal: () => void;
};
