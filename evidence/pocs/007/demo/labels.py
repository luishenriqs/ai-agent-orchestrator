"""Normalização de rótulos de demonstração."""

def normalize_label(value):
    """Converte um rótulo em identificador de exibição."""
    if not isinstance(value, str):
        raise TypeError("value must be str")
    return "_".join(value.lower().split())
