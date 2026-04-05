# Как забутится в свой же ПК
Оказывается в qemu можно загрузить свой же физический диск и она сможет его забутить, причем файлы на реальном диске не будут меняться :о

вот базовая команда:
```bash
sudo qemu-system-x86_64 -m 4096 -smp 4 -enable-kvm \
-bios /usr/share/edk2/x64/OVMF.4m.fd \
-drive file=/dev/sda,format=raw,snapshot=on
```

- `-m 4096` - кол-во ОЗУ
- `-smp 4` - кол-во ядер ЦП
- `-enable-kvm` - акселерация
- `-bios /usr/share/edk2/x64/OVMF.4m.fd` - для запуска на современных материнках (т.е. с UEFI)
- `-drive file=/dev/sda,format=raw,snapshot=on` - сам диск. **snapshot=on должен быть обязательно включен, он не даёт изменять данные на физическом диске**

Можно добавить 3D-акселерацию с venus(vulkan). Просто добавь это:
```bash
-device virtio-vga-gl,blob=on,hostmem=4G,venus=on -display sdl,gl=on
```
