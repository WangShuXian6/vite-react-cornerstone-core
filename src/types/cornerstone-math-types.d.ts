// 扩展Plane类的原型方法类型定义
declare module 'cornerstone-math' {
    interface Plane {
        setFromCoplanarPoints(a: Vector3, b: Vector3, c: Vector3): Plane;
        intersectLine(line: Line3, optionalTarget?: Vector3): Vector3 | undefined;
    }
}

// 模块增强（推荐）
// 如果想在不改变 Plane 类原始定义的基础上，对其类型进行扩展以添加额外的方法类型声明，可以利用模块声明合并的方式，也就是模块增强。
// 假设 cornerstone-math 相关代码是在一个模块（比如名为 cornerstone-math 的模块，这取决于实际的模块组织方式，可能是通过 import/export 规则来界定的模块范围）中，创建一个单独的类型声明文件（例如 cornerstone-math-types.d.ts，文件名可按实际情况取），内容如下：
// declare module 'cornerstone-math' {
//     interface Plane {
//         setFromCoplanarPoints(a: Vector3, b: Vector3, c: Vector3): Plane;
//         intersectLine(line: Line3, optionalTarget?: Vector3): Vector3 | undefined;
//     }
// }
// 这里通过 declare module 语句声明对 cornerstone-math 模块进行增强，在其中的 Plane 接口里添加了想要扩展的方法类型定义。这样做符合 TypeScript 中模块增强的规范，并且能清晰地表明是对 cornerstone-math 模块内 Plane 类类型的扩展，避免了直接类和接口合并的不安全问题，同时也能让代码结构更清晰，便于理解和维护。
// 需要注意的是，要确保这个类型声明文件能被你的项目正确识别和加载，一般可以通过 tsconfig.json 文件中的 include 或者 files 配置项将其包含进来，使 TypeScript 编译器能够应用这些类型扩展声明。