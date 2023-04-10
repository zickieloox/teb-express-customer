export const SHIPMENT_PENDING_STATUS = 1
export const SHIPMENT_PROCESS_STATUS = 2

export const MAP_SHIPMENT_STATUS = {
  [SHIPMENT_PENDING_STATUS]: {
    value: SHIPMENT_PENDING_STATUS,
    text: 'Pending',
    class: 'default',
  },
  [SHIPMENT_PROCESS_STATUS]: {
    value: SHIPMENT_PROCESS_STATUS,
    text: 'Process',
    class: 'success',
  },
}
