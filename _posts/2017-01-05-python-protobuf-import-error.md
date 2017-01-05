---
title: "Python3 Protobuf Import Error"
categories:
  - python3
tags:
  - python3
  - protobuf
comments: true
---

# Python 3 error

I'm trying to make the switch to Python 3 at the moment, and was getting incredibly frustrated getting this error when I imported a module using Google's Protocol Buffers:

```python
Traceback (most recent call last):
  File "/usr/local/Cellar/python3/3.5.1/Frameworks/Python.framework/Versions/3.5/lib/python3.5/site-packages/google/pr
otobuf/internal/python_message.py", line 1087, in MergeFromString
    if self._InternalParse(serialized, 0, length) != length:
  File "/usr/local/Cellar/python3/3.5.1/Frameworks/Python.framework/Versions/3.5/lib/python3.5/site-packages/google/pr
otobuf/internal/python_message.py", line 1109, in InternalParse
    (tag_bytes, new_pos) = local_ReadTag(buffer, pos)
  File "/usr/local/Cellar/python3/3.5.1/Frameworks/Python.framework/Versions/3.5/lib/python3.5/site-packages/google/pr
otobuf/internal/decoder.py", line 181, in ReadTag
    while six.indexbytes(buffer, pos) & 0x80:
TypeError: unsupported operand type(s) for &: 'str' and 'int'
```

After much messing around and not finding a fix from google, it turns out I had the wrong version of protobuf installed. Very easy fix:

```
pip3 uninstall protobuf && pip3 install python3-protobuf
```

Hopefully this post helps someone solve the same problem.
