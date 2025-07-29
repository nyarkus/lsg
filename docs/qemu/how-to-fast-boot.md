# Как быстро забутить виртуалку с .iso образа
Если тебе лень юзать virt manager, то просто в консоль эту фигню пишешь:

```
qemu-system-x86_64 -enable-kvm -cdrom OS_ISO.iso -boot menu=on -m 4G -cpu host -smp 8 -vga virtio -display sdl,gl=on
```

Это команда бутится с `OS_ISO.iso` с 4 гигами рама и 3D акселерацией