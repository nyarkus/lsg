# Blender
## Troubleshooting
### OpenImageDenoise не работает аппаратно на видеокартах AMD
Проблема решается созданием симлинка в папке Blender `lib/`:
```bash
ln -s /opt/rocm/lib/libamdhip64.so.7 libamdhip64.so.6
```
После этого аппаратное ускорение должно заработать 