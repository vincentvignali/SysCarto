export interface PathProps {
  from: DOMRect; // source of the link
  to: DOMRect; // destination of the link
  radius?: number; // radius of the angle
  paddingFrom?: number; // padding on the source side
  paddingTo?: number; // passing on the target side
}

export function URRawPath({
  from,
  to,
  radius = 0,
  paddingFrom = 0,
  paddingTo = 0,
}: PathProps): string {
  let startX = from.x + from.width / 2;
  let startY = from.y - paddingFrom;

  let endX = to.x - paddingTo;
  let endY = to.y + to.height / 2;

  let x1 = startX;
  let y1 = endY + radius;

  let x2 = startX + radius;
  let y2 = endY;

  return `M ${startX} ${startY} L ${x1} ${y1} Q ${startX} ${endY} ${x2} ${y2} L${endX} ${endY}`;
}

export function ULRawPath({
  from,
  to,
  radius = 0,
  paddingFrom = 0,
  paddingTo = 0,
}: PathProps): string {
  // here we suppose the following layout
  //
  //  to------
  //         |
  //         |
  //        from
  //
  let startX = from.x + from.width / 2;
  let startY = from.y - paddingFrom;

  let endX = to.x + to.width + paddingTo;
  let endY = to.y + to.height / 2;

  let x1 = startX;
  let y1 = endY + radius;

  let x2 = startX - radius;
  let y2 = endY;

  return `M ${startX} ${startY} L ${x1} ${y1} Q ${startX} ${endY} ${x2} ${y2} L${endX} ${endY}`;
}

export function LRRawPath({
  from,
  to,
  radius = 0,
  paddingFrom = 0,
  paddingTo = 0,
}: PathProps): string {
  // here we suppose the following layout
  //
  //  from
  //   |
  //   |
  //   --------- to
  //
  let startX = from.x + from.width / 2;
  let startY = from.y + from.height + paddingFrom;

  let endX = to.x - paddingTo;
  let endY = to.y + to.height / 2;

  let x1 = startX;
  let y1 = endY - radius;

  let x2 = startX + radius;
  let y2 = endY;

  return `M ${startX} ${startY} L ${x1} ${y1} Q ${startX} ${endY} ${x2} ${y2} L${endX} ${endY}`;
}

export function LLRawPath({
  from,
  to,
  radius = 0,
  paddingFrom = 0,
  paddingTo = 0,
}: PathProps): string {
  // here we suppose the following layout
  //
  //           from
  //            |
  //            |
  //   to -------
  //
  let startX = from.x + from.width / 2;
  let startY = from.y + from.height + paddingFrom;

  let endX = to.x + paddingTo;
  let endY = to.y + to.height / 2;

  let x1 = startX;
  let y1 = endY - radius;

  let x2 = startX - radius;
  let y2 = endY;

  return `M ${startX} ${startY} L ${x1} ${y1} Q ${startX} ${endY} ${x2} ${y2} L${endX} ${endY}`;
}

// This function tries to find the best shape
// of the path. It assumes that we the starting
// and ending points can be wherever on the objects
// (top, bottom, left, right)
export function BestRawPath({
  from,
  to,
  radius = 0,
  paddingFrom = 0,
  paddingTo = 0,
}: PathProps): string {
  if (from.y < to.y) {
    if (from.x < to.x) {
      return LRRawPath({ from, to, radius, paddingFrom, paddingTo });
    } else {
      return LLRawPath({ from, to, radius, paddingFrom, paddingTo });
    }
  } else {
    if (from.x < to.x) {
      return URRawPath({ from, to, radius, paddingFrom, paddingTo });
    } else {
      return ULRawPath({ from, to, radius, paddingFrom, paddingTo });
    }
  }
}
