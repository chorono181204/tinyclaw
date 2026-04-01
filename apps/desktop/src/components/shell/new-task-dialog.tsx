import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { Translator } from "../../i18n/provider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";

export function NewTaskDialog({
  open,
  onOpenChange,
  t
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  t: Translator;
}) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("modal.newTask.title")}</DialogTitle>
          <DialogDescription>{t("modal.newTask.description")}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-sm font-medium text-foreground">{t("modal.newTask.fields.goal")}</p>
            <Input className="mt-3 bg-card" placeholder={t("modal.newTask.placeholders.goal")} />
          </div>

          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-sm font-medium text-foreground">{t("modal.newTask.fields.risk")}</p>
            <Input className="mt-3 bg-card" placeholder={t("modal.newTask.placeholders.risk")} />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t("modal.newTask.cancel")}</Button>
          </DialogClose>
          <Button>{t("modal.newTask.confirm")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
