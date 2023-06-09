function isAnyCheckboxChecked() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const isCheckedArray = Array.from(checkboxes).map(
    (checkbox) => checkbox.checked
  );

  return isCheckedArray.includes(true);
}

export { isAnyCheckboxChecked };
