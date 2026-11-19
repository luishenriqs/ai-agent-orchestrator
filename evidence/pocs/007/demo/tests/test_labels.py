import unittest
from labels import normalize_label

class LabelTests(unittest.TestCase):
    def test_simple(self):
        self.assertEqual(normalize_label("Olá Mundo"), "olá_mundo")
    def test_numbers(self):
        self.assertEqual(normalize_label("Produto 42"), "produto_42")
    def test_invalid_type(self):
        with self.assertRaises(TypeError):
            normalize_label(None)

if __name__ == "__main__":
    unittest.main()
