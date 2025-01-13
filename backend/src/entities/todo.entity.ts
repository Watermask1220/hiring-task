import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";

@Entity("todo")
export class TodoEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "uuid", nullable: false })
  userId: string;

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ type: "boolean", default: false })
  status: boolean;

  @Column({ type: "date", nullable: false, default: "2023-01-01" })
  dueDate: Date;
}
