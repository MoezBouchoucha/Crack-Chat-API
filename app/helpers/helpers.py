from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import time
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.chrome.options import Options
import undetected_chromedriver as uc
import os
import sys


current_file_path = os.path.dirname(os.path.realpath(__file__))
user_data_folder = current_file_path + "/helpers/chromedata"
chrome_profile = "Default"




def wait_for_element(driver, xpath, timeout=2200):
    try:
        WebDriverWait(driver, timeout).until(EC.presence_of_element_located((By.XPATH, xpath)))
        
    except TimeoutException:
        pass

def is_element_present(driver, xpath):
    try:
        driver.find_element(By.XPATH, xpath)
    except NoSuchElementException:
        return False
    return True

def wait_for_element_visible(driver, xpath, timeout=5):
    try:
        WebDriverWait(driver, timeout).until(EC.visibility_of_element_located((By.XPATH, xpath)))
    except TimeoutException:
        pass

def is_element_visible(driver, xpath):
    try:
        return driver.find_element(By.XPATH, xpath).is_displayed()
    except NoSuchElementException:
        pass
        return False

def find_element(driver, xpath):
    try:
        element = driver.find_element(By.XPATH, xpath)
    except NoSuchElementException:
        return False
    return element

def find_elements(driver, xpath):
    try:
        elements = driver.find_elements(By.XPATH, xpath)
    except NoSuchElementException:
        return False
    return elements

def wait_for_x_seconds(driver, seconds):
    driver.implicitly_wait(seconds)

def load_chrome():
    options = Options()
    options.add_argument(f"--user-data-dir={user_data_folder}")
    options.add_argument(f'--profile-directory={chrome_profile}')

    
    global driver
    
    driver = uc.Chrome(options=options)

def start_chat_gpt():
    load_chrome()
    driver.maximize_window()
    driver.get("https://chat.openai.com/chat")
    
    #if login page is present
    time.sleep(1)
    login_msg_xpath = "//*[contains(text(), 'Log in with your OpenAI account to continue')]"
    login_page = is_element_present(driver,login_msg_xpath)
    if login_page:
        login_btn_xpath = "//*[@class='btn relative btn-primary']//*[contains(text(), 'Log in')]"
        wait_for_element(driver,login_btn_xpath)
        login_button = find_element(driver,login_btn_xpath)
        login_button.click()
        
        time.sleep(1)
        #google login
        google_btn_xpath = "//*[@data-provider='google']"
        wait_for_element(driver,google_btn_xpath)
        google_btn = find_element(driver,google_btn_xpath)
        google_btn.click()

        time.sleep(2)
        #select mail
        gmail_xpath = "//*[contains(text(), 'PRIYANSHU PATEL')]" ## change this to your google account name.
        wait_for_element(driver,gmail_xpath)
        gmail = find_element(driver,gmail_xpath)
        gmail.click()

    else:
        print("Already logged in")

def make_gpt_request(text):

    text_area_xpath = "//*[@id='prompt-textarea']"
    wait_for_element(driver,text_area_xpath)
    if is_element_present(driver,text_area_xpath):
        text_area = find_element(driver,text_area_xpath)
        text_area.send_keys(text)

        #send button
        send_btn_xpath = "//*[@data-testid='send-button']"
        wait_for_element(driver,send_btn_xpath)
        send_btn = find_element(driver,send_btn_xpath)
        time.sleep(1)
        send_btn.click()

    wait_for_x_seconds(driver,1.5)
    #waiting for response
    response_xpath_light = "//*[@class='markdown prose w-full break-words dark:prose-invert light']" # for light mode
    response_xpath_dark = "//*[@class='markdown prose w-full break-words dark:prose-invert dark']" # for dark mode
    regenrate_xpath = '//*[@id="__next"]/div[1]/div[2]/main/div[2]/div[2]/div[1]/div/form/div/div[2]/div/button'
    
    wait_for_element(driver,regenrate_xpath,120)

    # response_xpath = response_xpath_dark if driver.is_element_present(response_xpath_dark) else response_xpath_light # check for dark mode or light mode
    response_xpath=response_xpath_light

    if is_element_present(driver,response_xpath):
        wait_for_x_seconds(driver,1.5)
        response = find_elements(driver,response_xpath)[-1]
        # print(response.text)
        return response.text # will return all the texual information under that perticular xpath

def stop_chat_gpt():
    driver.close()
    driver.quit()

    
    