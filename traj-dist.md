最近帮老师修改论文实验，其中一个实验需要计算两条轨迹的相似度。网上相关的中文资料很少，这篇[文章](https://c-harlin.github.io/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2021/08/28/%E8%BD%A8%E8%BF%B9%E7%9B%B8%E4%BC%BC%E6%80%A7%E5%BA%A6%E9%87%8F.html)给我了很大的帮助。文中作者 Harlin 详细地介绍了轨迹相似性计算的各种方法，除此之外还提及了一个名叫 [traj_dist](https://github.com/bguillouet/traj-dist) 的 Python 包。

![traj_dist](assets/images/traj_dist.png)

Trajectory_distance 是一个用于计算二维轨迹对象之间距离的 Python 包，它使用 Cython 实现。其作者把常用的轨迹距离度量方法打包在一起，正好满足了我论文实验的需要。值得注意的是，Harlin 提到了包中关于 EDR 的实现有误。经过检查，我并没有找到错误的源码。

该项目的使用很简单，安装完成（具体参考 GitHub）后，只需要导入相关模块，即可使用。
```Python
import traj_dist.distance as tdist
import numpy as np

traj_a = np.array(traj_a,dtype=np.float64)
traj_b = np.array(traj_b,dtype=np.float64)

dist_sspd = tdist.sspd(traj_a,traj_b,type_d="euclidean")
dist_frechet = tdist.frechet(traj_a,traj_b,type_d="euclidean")
dist_edr = tdist.edr(traj_a, traj_b,type_d="euclidean",eps=0.001)
```
请注意，代码中轨迹应该表示为 nx2 的 numpy 数组。一些距离需要额外的参数，例如“球面距离”和“欧几里得距离”。