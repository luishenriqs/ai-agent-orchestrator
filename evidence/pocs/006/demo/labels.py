"""Normalização de rótulos para uma interface de demonstração."""

def normalize_label(value):
    """Converte um texto em identificador de exibição."""
    if not isinstance(value, str):
        raise TypeError("O rótulo deve ser uma string")
    return "_".join(value.lower().split())
