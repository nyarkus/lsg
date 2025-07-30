# Автоматическая дефрагментация ext4
Этот скрипт при запуске считает насколько диск фрагментирован и если значение фрагментации выше порога - дефрагментирует. За всё время пользования ext4 у меня диски не особо фрагментировались в отличии от ntfs, но всё же.

```bash
#!/bin/bash

THRESHOLD=30 # (1)
TARGETS=( # (2)
    "/mnt/hdd/"
    "ещё какой-нибудь диск"
)

if ! command -v e4defrag &> /dev/null; then
    echo "❌ Утилита e4defrag не установлена. Установи её: sudo pacman -S e2fsprogs"
    exit 1
fi

for TARGET in "${TARGETS[@]}"; do
    if [ ! -d "$TARGET" ]; then
        echo "❌ Путь не существует или не является директорией: $TARGET"
        continue
    fi

    echo "🔍 Проверяю: $TARGET"
    SCORE_LINE=$(sudo e4defrag -c "$TARGET" | grep "Fragmentation score")
    SCORE=$(echo "$SCORE_LINE" | grep -o '[0-9]\+')

    echo "📊 $TARGET → fragmentation score: $SCORE"

    if [ "$SCORE" -gt "$THRESHOLD" ]; then
        echo "⚠️  Фрагментация превышает порог $THRESHOLD. Запускаю дефрагментацию..."
        sudo e4defrag "$TARGET"
        echo "✅ Дефрагментация завершена для $TARGET"
    else
        echo "✅ Фрагментация в норме. Пропускаем $TARGET"
    fi

    echo "-----------------------------"
done
```

1. Пороговое значение фрагментации. Утилита `e4defrag` советует вот эти значения: **[0-30 no problem: 31-55 a little bit fragmented: 56- needs defrag]**
2. Массив папок

Запускать этот скрипт надо от root прав. Можно использовать с crontab (пакет [cronie](https://archlinux.org/packages/?name=cronie), [гайд](https://wiki.archlinux.org/title/Cron#Basic_commands)):
```
@weekly /usr/local/bin/defrag.sh
```