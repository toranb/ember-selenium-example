import sys
import os
from os.path import join, abspath, dirname
import time
import subprocess
import multiprocessing
import SimpleHTTPServer
import SocketServer

DRIVER_PATH = abspath(join(dirname(__file__), 'lib'))
PROJECT_PATH = abspath(join(dirname(__file__), '..', '..'))
TEST_SCRIPT = abspath(join(dirname(__file__), 'tests.rb'))

def test_server():
    Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
    httpd = SocketServer.TCPServer(("", 3000), Handler)
    httpd.serve_forever()

def run_watir_tests_with_firefox():
    os.environ['browser'] = 'firefox'
    run_result = subprocess.call(['bundle', 'exec', 'ruby', TEST_SCRIPT])
    if run_result > 0:
        raise Exception("{} selenium test(s) failed".format(run_result))

if __name__ == '__main__':
    os.environ['PATH'] = ';'.join([os.environ['PATH'], DRIVER_PATH])
    sys.path.append(PROJECT_PATH)
    p = multiprocessing.Process(target=test_server)
    p.daemon = True
    p.start()
    time.sleep(2)
    run_watir_tests_with_firefox()
