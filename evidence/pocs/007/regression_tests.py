import unittest
from labels import normalize_label

class RegressionTests(unittest.TestCase):
    def test_leading_trailing(self):
        self.assertEqual(normalize_label("  Olá Mundo  "), "olá_mundo")
    def test_multispace(self):
        self.assertEqual(normalize_label("A   B"), "a_b")
    def test_tab_newline(self):
        self.assertEqual(normalize_label("A\tB\nC"), "a_b_c")
    def test_only_whitespace(self):
        self.assertEqual(normalize_label("  \t "), "")
    def test_empty(self):
        self.assertEqual(normalize_label(""), "")

if __name__ == "__main__":
    unittest.main()
