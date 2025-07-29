# Как быстро забутить виртуалку с .iso образа
Если тебе лень юзать virt manager, то просто в консоль эту фигню пишешь:

```bash
qemu-system-x86_64 -enable-kvm -cdrom OS_ISO.iso -boot menu=on -m 4G -cpu host -smp 8 -vga virtio -display sdl,gl=on
```

Это команда бутит `OS_ISO.iso` с 4 гигами рама, 3D акселерацией, и 8 потоками ЦП.