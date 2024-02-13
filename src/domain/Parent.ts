import { z } from "zod"
import { AddressSchema, Serializable, type Address } from "./types.js"
import { randomUUID } from "crypto"

export const ParentCreationSchema = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string(),
  surname: z.string(),
  phones: z.array(z.string()).nonempty(),
  emails: z.array(z.string().email()).nonempty(),
  address: z.array(AddressSchema).nonempty(),
  document: z.string()
})

export type ParentCreationType = z.infer<typeof ParentCreationSchema>

export class Parent implements Serializable {
  firstName: ParentCreationType['firstName']
  surname: ParentCreationType['surname']
  phones: ParentCreationType['phones']
  emails: ParentCreationType['emails']
  address: ParentCreationType['address']
  document: ParentCreationType['document']
  readonly id: string

  constructor(data: ParentCreationType) {
    this.firstName = data.firstName
    this.surname = data.surname
    this.phones = data.phones
    this.emails = data.emails
    this.address = data.address
    this.document = data.document,
    this.id = data.id ?? randomUUID()
  }

  static fromObject(data: Record<string, unknown>) {
    return new Parent(ParentCreationSchema.parse(data))
  }

  toObject() {
    return {
      id: this.id,
      firstName: this.firstName,
      surname: this.surname,
      phones: this.phones,
      emails: this.emails,
      address: this.address,
      document: this.document,
    }
  }

  toJSON() {
    return JSON.stringify(this.toObject);
  }
}