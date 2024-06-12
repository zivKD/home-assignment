import { Dialog as MUIDialog, DialogTitle, DialogActions, Button } from "@mui/material";

type DailogProps = {
  text: string,
  onConfirm: () => Promise<void>,
  isOpened: boolean,
  close: () => void
};

export const Dialog: React.FC<DailogProps> = ({ onConfirm, isOpened, close, text }) => {
  const confirm = async () => {
    await onConfirm();
    close();
  };

  return (
    <MUIDialog open={isOpened} onClose={close}>
      <DialogTitle>
        Do you want to { text }
      </DialogTitle>
      <DialogActions>
        <Button onClick={close}>No</Button>
        <Button onClick={confirm}>Yes</Button>
      </DialogActions>
    </MUIDialog>
  );
};