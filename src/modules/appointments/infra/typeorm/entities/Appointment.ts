import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @Column('time with time zone') // type colum
  date: Date; // name property

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // relationship
  // oneToOne (um para um)
  // OneToMany (um para muitos)
  // ManyToMany (muito para muitos)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;
}

export default Appointment;
