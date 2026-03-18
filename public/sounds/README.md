# 🔊 sounds/

Drop your MP3 files here, named by letter:

```
a.mp3   → "Ah… A is for Apple"
b.mp3   → "Buh… B is for Ball"
c.mp3   → "Kuh… C is for Cat"
...
z.mp3   → "Zuh… Z is for Zebra"
```

Then in `alphabetData.ts`, add the `soundFile` field:

```ts
{ letter: 'A', word: 'Apple', emoji: '🍎', phonics: 'Ah', soundFile: '/sounds/a.mp3' }
```

And uncomment the `Audio()` block in `src/hooks/useSound.ts`.
