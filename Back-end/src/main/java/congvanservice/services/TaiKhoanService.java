package congvanservice.services;

import congvanservice.models.TaiKhoan;

import java.util.List;
import java.util.Optional;

public interface TaiKhoanService {
    //CRUD
    Optional<TaiKhoan> findTaiKhoanById(Integer maTaiKhoan);
    TaiKhoan saveTaiKhoan(TaiKhoan taiKhoan);
    TaiKhoan updateTaiKhoan(TaiKhoan taiKhoan);
    void deleteTaiKhoan(Integer maTaiKhoan);
    //Other
    List<TaiKhoan> findAll();
}
