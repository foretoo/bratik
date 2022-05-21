let i;
const round_shape = (points, radius) => {
    i = points.length;
    const rounded_points = points.map((curr, id) => {
        const prev = points[(id - 1 + points.length) % points.length], next = points[(id + 1) % points.length], next_length = find_length(curr, next), prev_length = find_length(prev, curr), angles = get_angles(prev, curr, next), vel = 1 / Math.tan(angles.main / 2), offset = radius * vel;
        const result = Object.assign(Object.assign({}, curr), { id,
            angles,
            vel,
            offset, radius: { size: radius, x: curr.x, y: curr.y, hit: radius }, in: { x: curr.x, y: curr.y, length: prev_length, rest: prev_length }, out: { x: curr.x, y: curr.y, length: next_length, rest: next_length }, locked: false,
        });
        return result;
    });
    rounded_points.forEach((p, id) => {
        Object.assign(p, {
            get prev() { return getprev(id, rounded_points); },
            get next() { return getnext(id, rounded_points); }
        })
        p.radius.hit = Math.min(p.out.length / (p.vel + p.next.vel), p.in.length / (p.vel + p.prev.vel));
    });
    rounded_points.sort((a, b) => a.radius.hit - b.radius.hit);
    while (i) {
        clac(rounded_points[0], rounded_points, radius);
        rounded_points
            .sort((a, b) => {
            if (a.locked && !b.locked)
                return 1;
            else if (!a.locked && b.locked)
                return -1;
            else if (a.locked && b.locked)
                return 0;
            else
                return a.radius.hit - b.radius.hit;
        });
    }
    rounded_points
        .sort((a, b) => a.id - b.id)
        .forEach(fin_set);
    return rounded_points;
};
const clac = (curr, points, radius) => {
    if (!curr.locked) {
        const prev = points.find((p) => p.id === (curr.id - 1 + points.length) % points.length);
        const next = points.find((p) => p.id === (curr.id + 1) % points.length);
        if (radius >= curr.radius.hit) {
            if (curr.radius.hit === next.radius.hit) {
                const _prev = points.find((p) => p.id === (prev.id - 1 + points.length) % points.length);
                const _next = points.find((p) => p.id === (next.id + 1) % points.length);
                const _nnext = points.find((p) => p.id === (_next.id + 1) % points.length);
                curr.radius.size = curr.radius.hit;
                next.radius.size = curr.radius.hit;
                next.locked = true;
                curr.locked = true;
                i -= 2;
                curr.offset = curr.radius.size * curr.vel;
                next.offset = next.radius.size * next.vel;
                _next.in.rest -= next.offset;
                next.out.rest -= next.offset;
                next.in.rest -= next.offset;
                next.in.rest -= curr.offset;
                curr.out.rest -= curr.offset;
                curr.in.rest -= curr.offset;
                prev.out.rest -= curr.offset;
                _next.radius.hit = Math.min(_next.out.length / (_next.vel + _nnext.vel), _next.in.rest / _next.vel);
                prev.radius.hit = Math.min(prev.in.length / (prev.vel + _prev.vel), prev.out.rest / prev.vel);
            }
            else if (curr.radius.hit === prev.radius.hit) {
                const _next = points.find((p) => p.id === (next.id + 1) % points.length);
                const _prev = points.find((p) => p.id === (prev.id - 1 + points.length) % points.length);
                const _pprev = points.find((p) => p.id === (_prev.id - 1 + points.length) % points.length);
                curr.radius.size = curr.radius.hit;
                prev.radius.size = curr.radius.hit;
                curr.locked = true;
                prev.locked = true;
                i -= 2;
                curr.offset = curr.radius.size * curr.vel;
                prev.offset = prev.radius.size * prev.vel;
                _prev.out.rest -= prev.offset;
                prev.in.rest -= prev.offset;
                prev.out.rest -= prev.offset;
                prev.out.rest -= curr.offset;
                curr.in.rest -= curr.offset;
                curr.out.rest -= curr.offset;
                next.in.rest -= curr.offset;
                _prev.radius.hit = Math.min(_prev.in.length / (_prev.vel + _pprev.vel), _prev.out.rest / _prev.vel);
                next.radius.hit = Math.min(next.out.length / (next.vel + _next.vel), next.in.rest / next.vel);
            }
            else {
                if (prev.locked && !next.locked) {
                    curr.radius.size = Math.min(curr.in.rest / curr.vel, curr.out.length / (curr.vel + next.vel), curr.radius.size);
                }
                if (next.locked && !prev.locked) {
                    curr.radius.size = Math.min(curr.out.rest / curr.vel, curr.in.length / (curr.vel + prev.vel), curr.radius.size);
                }
                if (next.locked && prev.locked) {
                    curr.radius.size = Math.min(curr.in.rest / curr.vel, curr.out.rest / curr.vel, curr.radius.size);
                }
                curr.offset = curr.radius.size * curr.vel;
                prev.out.rest -= curr.offset;
                curr.in.rest -= curr.offset;
                curr.out.rest -= curr.offset;
                next.in.rest -= curr.offset;
                curr.locked = true;
                i--;
            }
        }
        else {
            curr.offset = curr.radius.size * curr.vel;
            prev.out.rest -= curr.offset;
            curr.in.rest -= curr.offset;
            curr.out.rest -= curr.offset;
            next.in.rest -= curr.offset;
            curr.locked = true;
            i--;
        }
    }
};
const fin_set = (p) => {
    const curr_bis_size = p.radius.size / Math.sin(p.angles.main / 2);
    p.radius.x = p.x + Math.cos(p.angles.bis) * curr_bis_size;
    p.radius.y = p.y + Math.sin(p.angles.bis) * curr_bis_size;
    p.in.x = p.x + Math.cos(p.angles.prev) * p.offset;
    p.in.y = p.y + Math.sin(p.angles.prev) * p.offset;
    p.out.x = p.x + Math.cos(p.angles.next) * p.offset;
    p.out.y = p.y + Math.sin(p.angles.next) * p.offset;
};
const get_angles = (prev_point, curr_point, next_point) => {
    const main = find_angle(prev_point, curr_point, next_point), prev = find_angle(curr_point, prev_point), next = find_angle(curr_point, next_point), dir = get_clock_dir(prev, next), bis = prev + dir * main / 2;
    return { main, next, prev, bis, dir };
};
const getprev = (i, arr) => {
    return arr[(i - 1 + arr.length) % arr.length];
};
const getnext = (i, arr) => {
    return arr[(i + 1) % arr.length];
};
const find_length = (A, B) => {
    return Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
};
const find_angle = (A, B, C) => {
  if (!C)
    return Math.atan2(B.y - A.y, B.x - A.x)
  else {
    const AB = find_length(A, B),
          BC = find_length(B, C),
          CA = find_length(C, A)

    return Math.acos((AB*AB + BC*BC - CA*CA) / (2*AB*BC))
  }
};
const PI = Math.PI, TAU = PI * 2
const get_clock_dir = (angle1, angle2) => {
  const angle_diff = angle2 - angle1
  return (
    (angle_diff > PI && angle_diff < TAU) ||
    (angle_diff < 0  && angle_diff > -PI)
    ? -1 : 1
  )
};
export { round_shape, };
