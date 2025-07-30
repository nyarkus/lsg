# Тесты для мерения писюнами
## glxgears 
![](glxgears.gif)

В линухе есть утилита **glxgears**, идущая с !pkg[mesa-utils], это штука просто крутит шестерёнки и пишет фэпэс в терминал. 
### Траблы
#### Адаптивная синхронизация (FreeSync/GSync)
Просто запусти с
```bash
vblank_mode=0 glxgears
```
или, если не сработает
```bash
env vblank_mode=0 glxgears
```