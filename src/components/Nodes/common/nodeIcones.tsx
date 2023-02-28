import { svgCollection } from "@/components/types";
import { IconType } from "react-icons";
import {
  BsArrowDownCircle,
  BsGearFill,
  BsPersonBoundingBox,
} from "react-icons/bs";
import { FaDocker, FaLock, FaLockOpen, FaNetworkWired } from "react-icons/fa";
import { HiServer } from "react-icons/hi";
import { HiCpuChip, HiOutlineCube } from "react-icons/hi2";
import { MdNetworkCell, MdPower, MdStorage } from "react-icons/md";
import { TbArrowFork, TbBoxModel, TbMoodEmpty } from "react-icons/tb";

interface nodeIconesCollection {
  [key: string]: IconType;
}

export const nodeIcones: nodeIconesCollection = {
  subnetwork: FaNetworkWired,
  network_interface: MdNetworkCell,
  machine: HiServer,
  service: HiOutlineCube,
  meta_service: BsGearFill,
  pdu: TbArrowFork,
  power: MdPower,
  rack: MdStorage,
  docker: FaDocker,
  virtual_machine: HiCpuChip,
  empty: TbMoodEmpty,
};
