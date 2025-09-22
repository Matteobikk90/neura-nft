type ModalPayloadMap = {
  qr: { address: string };
  confirm: { title: string; onConfirm: () => void };
  filter: object;
  mint: { collectionId?: string } | undefined;
  info: undefined;
};

type ModalType = keyof ModalPayloadMap;

export type ModalSliceType<T extends ModalType = ModalType> = {
  type: T | null;
  data: ModalPayloadMap[ModalType] | null | undefined;
  openModal: <K extends ModalType>(type: K, data?: ModalPayloadMap[K]) => void;
  closeModal: () => void;
};
