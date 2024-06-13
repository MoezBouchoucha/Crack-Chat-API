from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By


class HelperFn:
    def __init__(self, driver):
        self.driver = driver
    
    def wait_for_element(self, xpath, timeout=2200):
        try:
            WebDriverWait(self.driver, timeout).until(EC.presence_of_element_located((By.XPATH, xpath)))
            
        except TimeoutException:
            pass
    
    def is_element_present(self, xpath):
        try:
            driver.find_element(By.XPATH, xpath)
      except NoSuchElementException:
            return False
        return True

    def wait_for_element_visible(self, xpath, timeout=5):
        try:
            WebDriverWait(self.driver, timeout).until(EC.visibility_of_element_located((By.XPATH, xpath)))
        except TimeoutException:
            pass
    
    def is_element_visible(self, xpath):
        try:
            return self.driver.find_element(By.XPATH, xpath).is_displayed()
        except NoSuchElementException:
            pass
            return False
    
    def find_element(self, xpath):
        try:
            element = self.driver.find_element(By.XPATH, xpath)
        except NoSuchElementException:
            return False
        return element

    def find_elements(self, xpath):
        try:
            elements = self.driver.find_elements(By.XPATH, xpath)
        except NoSuchElementException:
            return False
        return elements
    
    def wait_for_x_seconds(self, seconds):
        self.driver.implicitly_wait(seconds)
        