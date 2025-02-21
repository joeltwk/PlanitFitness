/**
 * Codes from
 * https://www.javaguides.net/2020/01/spring-boot-mariadb-crud-example-tutorial.html
 */

package main.exception;

import java.io.Serial;

public class ResourceNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public ResourceNotFoundException(String message){
        super(message);
    }
}
