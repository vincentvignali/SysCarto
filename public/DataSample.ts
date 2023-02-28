import { Edge, MarkerType, Node } from "reactflow";

const hypervisorStyle = {
  width: 200,
  height: 150,
};

const vmStyle = {
  width: 0.8 * hypervisorStyle.width,
  height: 0.5 * hypervisorStyle.height,
};

const appStyle = {
  width: 0.2 * vmStyle.width,
  height: 0.9 * vmStyle.height,
};
const pduStyle = {
  width: 0.5 * vmStyle.width,
  height: 0.9 * vmStyle.height,
};

const serviceStyle = {
  width: 0.5 * hypervisorStyle.width,
  height: 0.5 * hypervisorStyle.width,
  borderRadius: "100%",
};

const machines = [
  {
    id: "h01",
    type: "machine",
    position: {
      x: 30,
      y: 180,
    },
    data: {
      label: "h01.evilcorp.com",
    },
    style: hypervisorStyle,
  },
  {
    id: "h02",
    type: "machine",
    position: {
      x: 30,
      y: 180,
    },
    data: {
      label: "h02.evilcorp.com",
    },
    style: hypervisorStyle,
  },
  {
    id: "h03",
    type: "machine",
    position: {
      x: 30,
      y: 180,
    },
    data: {
      label: "h03.evilcorp.com",
    },
    style: hypervisorStyle,
  },
  {
    id: "h04",
    type: "machine",
    position: {
      x: 30,
      y: 180,
    },
    data: {
      label: "h04.evilcorp.com",
    },
    style: hypervisorStyle,
  },
  {
    id: "h05",
    type: "machine",
    position: {
      x: 30,
      y: 180,
    },
    data: {
      label: "h05.evilcorp.com",
    },
    style: hypervisorStyle,
  },
  {
    id: "h06",
    type: "machine",
    position: {
      x: 30,
      y: 180,
    },
    data: {
      label: "h06.evilcorp.com",
    },
    style: hypervisorStyle,
  },
].map((machine, idx) => {
  const gap = 50;
  if (idx % 2 === 0) {
    machine.position.x = 30;
  } else {
    machine.position.x = 30 + hypervisorStyle.width + gap;
  }
  machine.position.y = Math.floor(idx / 2) * (hypervisorStyle.height + gap);
  return machine;
});

const vms = [
  {
    id: `vm01`,
    type: "machine",
    data: { label: `vm01.evilcorp.com`, machine_type: "virtual_machine" },
    style: vmStyle,
    position: { x: 0.1 * hypervisorStyle.width, y: 10 },
    parentNode: `h01`,
    extent: "parent",
  },
  {
    id: `vm02`,
    type: "machine",
    data: { label: `vm02.evilcorp.com`, machine_type: "virtual_machine" },
    style: vmStyle,
    position: { x: 0.1 * hypervisorStyle.width, y: 10 },
    parentNode: `h02`,
    extent: "parent",
  },
  {
    id: `vm03`,
    type: "machine",
    data: { label: `vm03.evilcorp.com`, machine_type: "virtual_machine" },
    style: vmStyle,
    position: { x: 0.1 * hypervisorStyle.width, y: 10 },
    parentNode: `h03`,
    extent: "parent",
  },
  {
    id: `vm04`,
    type: "machine",
    data: { label: `vm04.evilcorp.com`, machine_type: "virtual_machine" },
    style: vmStyle,
    position: { x: 0.1 * hypervisorStyle.width, y: 10 },
    parentNode: `h04`,
    extent: "parent",
  },
  {
    id: `vm05`,
    type: "machine",
    data: { label: `vm05.evilcorp.com`, machine_type: "virtual_machine" },
    style: vmStyle,
    position: { x: 0.1 * hypervisorStyle.width, y: 10 },
    parentNode: `h05`,
    extent: "parent",
  },
  {
    id: `vm06`,
    type: "machine",
    data: { label: `vm06.evilcorp.com`, machine_type: "virtual_machine" },
    style: vmStyle,
    position: { x: 0.1 * hypervisorStyle.width, y: 10 },
    parentNode: `h06`,
    extent: "parent",
  },
];

const services = [
  {
    id: `service01`,
    type: "service",
    data: { label: `ldap01.evilcorp.com` },
    style: appStyle,
    position: { x: 0.1 * hypervisorStyle.width, y: 5 },
    parentNode: `vm01`,
    extent: "parent",
  },
  {
    id: `service02`,
    type: "service",
    data: { label: `ldap02.evilcorp.com` },
    style: appStyle,
    position: { x: 0.1 * hypervisorStyle.width, y: 5 },
    parentNode: `vm02`,
    extent: "parent",
  },
  {
    id: `service03`,
    type: "service",
    data: { label: `web01.evilcorp.com` },
    style: appStyle,
    position: { x: 0.1 * hypervisorStyle.width, y: 5 },
    parentNode: `vm03`,
    extent: "parent",
  },
  {
    id: `service04`,
    type: "service",
    data: { label: `web02.evilcorp.com` },
    style: appStyle,
    position: { x: 0.1 * hypervisorStyle.width, y: 5 },
    parentNode: `vm04`,
    extent: "parent",
  },
  {
    id: `service05`,
    type: "service",
    data: { label: `web03.evilcorp.com` },
    style: appStyle,
    position: { x: 0.1 * hypervisorStyle.width, y: 5 },
    parentNode: `vm05`,
    extent: "parent",
  },
  {
    id: `service06`,
    type: "service",
    data: { label: `sso-cas.evilcorp.com` },
    style: appStyle,
    position: { x: 0.3 * hypervisorStyle.width, y: 5 },
    parentNode: `vm05`,
    extent: "parent",
  },
  {
    id: `service07`,
    type: "service",
    data: { label: `web04.evilcorp.com` },
    style: appStyle,
    position: { x: 0.1 * hypervisorStyle.width, y: 5 },
    parentNode: `vm06`,
    extent: "parent",
  },
  {
    id: `service08`,
    type: "service",
    data: { label: `ident.evilcorp.com` },
    style: appStyle,
    position: { x: 0.3 * hypervisorStyle.width, y: 5 },
    parentNode: `vm06`,
    extent: "parent",
  },
];

const metaServices = [
  {
    id: `openldap`,
    type: "meta_service",
    position: { x: 3.5 * hypervisorStyle.width, y: 400 },
    data: { label: `OpenLDAP` },
    style: serviceStyle,
  },
  {
    id: `front`,
    type: "meta_service",
    position: { x: 5 * hypervisorStyle.width, y: 300 },
    data: { label: `HTTP Front` },
    style: serviceStyle,
  },
  {
    id: `cas`,
    type: "meta_service",
    position: { x: 4 * hypervisorStyle.width, y: 120 },
    data: { label: `CAS` },
    style: serviceStyle,
  },
  {
    id: `shibboleth`,
    type: "meta_service",
    position: { x: 4 * hypervisorStyle.width, y: -80 },
    data: { label: `Shibboleth` },
    style: serviceStyle,
  },
];

const racks = [
  {
    id: `rack0`,
    type: "rack",
    position: { x: -2 * hypervisorStyle.width, y: 0 },
    data: { label: `Rack0` },
    style: vmStyle,
  },
  {
    id: `rack1`,
    type: "rack",
    position: { x: -1.5 * hypervisorStyle.width, y: 100 },
    data: { label: `Rack1` },
    style: vmStyle,
  },
];

const pdus = [
  {
    id: `pdu0`,
    type: "pdu",
    position: { x: -2 * hypervisorStyle.width, y: 260 },
    data: { label: `PDU` },
    style: pduStyle,
  },
];

const powerSources = [
  {
    id: `power0`,
    type: "power",
    position: { x: -1.5 * hypervisorStyle.width, y: 400 },
    data: { label: `Power Source` },
    style: serviceStyle,
  },
];

const physicalEdges = [
  {
    id: "power-supply0",
    target: "power0",
    source: "pdu0",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
  {
    id: "rack-power-supply0",
    target: "pdu0",
    source: "rack0",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
  {
    id: "rack-power-supply1",
    target: "pdu0",
    source: "rack1",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
];

const remotePhysicalEdges = [
  {
    id: "rack0-h01",
    target: "rack0",
    source: "h01",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
  {
    id: "rack0-h02",
    target: "rack0",
    source: "h02",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
  {
    id: "rack0-h03",
    target: "rack0",
    source: "h03",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
  {
    id: "rack1-h04",
    target: "rack1",
    source: "h04",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
  {
    id: "rack1-h05",
    target: "rack1",
    source: "h05",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
  {
    id: "rack1-h06",
    target: "rack1",
    source: "h06",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
];

const infraEdges = [
  {
    id: "shibboleth-serve",
    source: "service08",
    target: "service07",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
  {
    id: "cas-serve",
    source: "service06",
    target: "service05",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
];

const metaServicesEdges = [
  {
    id: "cas-shibboleth",
    target: "cas",
    source: "shibboleth",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
  {
    id: "front-cas",
    target: "front",
    source: "cas",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
  {
    id: "openldap-cas",
    target: "openldap",
    source: "cas",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
  {
    id: "front-shibboleth",
    target: "front",
    source: "shibboleth",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
];

const remoteMetaEdges = [
  {
    id: "cas-service",
    target: "service06",
    source: "cas",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
  {
    id: "shibboleth-service",
    target: "service08",
    source: "shibboleth",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
  {
    id: "front-service01",
    target: "service03",
    source: "front",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
  {
    id: "front-service02",
    target: "service04",
    source: "front",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
  {
    id: "openldap-service01",
    target: "service01",
    source: "openldap",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
  {
    id: "openldap-service02",
    target: "service02",
    source: "openldap",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      orient: "90",
    },
  },
];

export const initialNodes: Node<any>[] = [
  ...machines,
  ...vms,
  ...services,
  ...metaServices,
  ...racks,
  ...pdus,
  ...powerSources,
];

export const initialEdges: Edge<any>[] = [
  ...infraEdges,
  ...metaServicesEdges,
  ...remoteMetaEdges,
  ...physicalEdges,
  ...remotePhysicalEdges,
];
