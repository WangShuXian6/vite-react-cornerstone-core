// 首先定义Vector3的类型，由于不清楚其完整结构，这里简单示意一些常见的方法类型签名，可根据实际的vector3.js内容完善
interface Vector3 {
    copy(other: Vector3): Vector3;
    addVectors(a: Vector3, b: Vector3): Vector3;
    multiplyScalar(scalar: number): Vector3;
    subVectors(a: Vector3, b: Vector3): Vector3;
    dot(other: Vector3): number;
    distanceTo(other: Vector3): number;
    distanceToSquared(other: Vector3): number;
    length(): number;
    lengthSq(): number;
    negate(): Vector3;
    applyMatrix4(matrix: any): Vector3; // 假设matrix有合适的类型定义，这里先用any占位，可细化
    equals(other: Vector3): boolean;
    clone(): Vector3;
}

// 定义Line3的类类型
class Line3 {
    constructor(start?: Vector3, end?: Vector3);
    set(start: Vector3, end: Vector3): Line3;
    copy(line: Line3): Line3;
    center(optionalTarget?: Vector3): Vector3;
    delta(optionalTarget?: Vector3): Vector3;
    distanceSq(): number;
    distance(): number;
    at(t: number, optionalTarget?: Vector3): Vector3;
    closestPointToPointParameter(point: Vector3, clampToLine: boolean): number;
    closestPointToPoint(point: Vector3, clampToLine: boolean, optionalTarget?: Vector3): Vector3;
    applyMatrix4(matrix: any): Line3; // 同样matrix类型可细化
    equals(line: Line3): boolean;
    clone(): Line3;
    intersectLine(line: Line3): Vector3 | void; // 返回值可能是交点Vector3或者无返回（void），根据源码逻辑
}

// 定义Plane的类类型
class Plane {
    constructor(normal?: Vector3, constant?: number);
    set(normal: Vector3, constant: number): Plane;
    setComponents(x: number, y: number, z: number, w: number): Plane;
    setFromNormalAndCoplanarPoint(normal: Vector3, point: Vector3): Plane;
    copy(plane: Plane): Plane;
    normalize(): Plane;
    negate(): Plane;
    distanceToPoint(point: Vector3): number;
    distanceToSphere(sphere: any): number; // 假设sphere有合适类型定义，这里先用any占位
    projectPoint(point: Vector3, optionalTarget?: Vector3): Vector3;
    orthoPoint(point: Vector3, optionalTarget?: Vector3): Vector3;
    isIntersectionLine(line: Line3): boolean;
    intersectPlane(targetPlane: Plane): { origin: Vector3, direction: Vector3 };
    coplanarPoint(optionalTarget?: Vector3): Vector3;
    translate(offset: Vector3): Plane;
    equals(plane: Plane): boolean;
    clone(): Plane;
}

// 定义全局的一些工具函数类型
declare namespace Global {
    function clamp(x: number, a: number, b: number): number;
    function degToRad(degrees: number): number;
    function approximatelyEquals(a: number, b: number, epsilon?: number): boolean;
    function radToDeg(radians: number): number;
    function sign(x: number): number;
    function pageToPoint(e: any): { x: number, y: number }; // 假设e有合适类型定义，这里先用any占位
    function subtract(lhs: { x: number, y: number }, rhs: { x: number, y: number }): { x: number, y: number };
    function copy(point: { x: number, y: number }): { x: number, y: number };
    function distance(from: { x: number, y: number }, to: { x: number, y: number }): number;
    function distanceSquared(from: { x: number, y: number }, to: { x: number, y: number }): number;
    function insideRect(point: { x: number, y: number }, rect: any): boolean; // 假设rect有合适类型定义，这里先用any占位
    function findClosestPoint(sources: { x: number, y: number }[], target: { x: number, y: number }): { x: number, y: number };
}

export {
    Vector3,
    Line3,
    Plane,
    Global
};