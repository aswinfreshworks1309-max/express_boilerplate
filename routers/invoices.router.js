import { Router } from "express";
import { validateSchema } from "../middleware/validate.schema";
import { createInvoiceSchema } from "../schemas/invoices.schema";

const invoiceRouter = Router();

invoiceRouter.post("/", validateSchema(createInvoiceSchema), (req, res) => {});
