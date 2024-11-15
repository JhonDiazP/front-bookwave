import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { DocumentTypeService } from 'src/app/business-controller/document-type.service';
import { GenderService } from 'src/app/business-controller/gender.service';
import { TerritoriesService } from 'src/app/business-controller/territories.service';
import { UserService } from 'src/app/business-controller/user.service';
import { DocumentType } from 'src/app/models/document-type';
import { Gender } from 'src/app/models/gender';
import { Country } from 'src/app/models/territories/country';
import { Municipality } from 'src/app/models/territories/municipality';
import { Region } from 'src/app/models/territories/region';

@Component({
  selector: 'app-form-register',
  standalone: false,
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.scss'
})
export class FormRegisterComponent implements OnInit {

  public userForm: FormGroup;
  public genders!: Gender[];
  public documentTypes!: DocumentType[];
  public countries!: Country[];
  public regions!: Region[];
  public municipalities!: Municipality[];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private territoriesService: TerritoriesService,
    private documentTypeService: DocumentTypeService,
    private genderService: GenderService,
    private userService: UserService
  ) { 
    this.userForm = this.fb.group({
      document_type_id: ['', Validators.required],
      document: ['', [Validators.required]],
      firstname: ['', Validators.required],
      middlelastname: [''],
      lastname: ['', Validators.required],
      middlefirstname: [''],
      country: ['', Validators.required],
      region: ['', Validators.required],
      municipality_id: ['', Validators.required],
      gender_id: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator()]],
      passwordConfirmed: ['', [Validators.required,]],
      status: [true]
    });
  }

  ngOnInit(): void {
    this.getDocumentTypes();
    this.getGenders();
    this.getCountries();
  }

  getDocumentTypes() {
    this.documentTypeService.getDocumentTypes().then(documentTypes => {
      this.documentTypes = documentTypes;
    }).catch(x => {

    })
  }

  getGenders() {
    this.genderService.getGenders().then(genders => {
      this.genders = genders;
    }).catch(x => {

    })
  }

  getCountries(){
    this.territoriesService.getCountry().then(countries => {
      this.countries = countries;
    }).catch(x => {

    })
  }

  getRegionsByCountry(event: DropdownChangeEvent){
    this.territoriesService.getRegion({country_id: event.value}).then(regions => {
      this.regions = regions;
    }).catch(x => {

    })
  }

  getMunicipalitiesByRegion(event: DropdownChangeEvent){
    this.territoriesService.getMunicipalities({region_id: event.value}).then(municipalities => {
      this.municipalities = municipalities;
    }).catch(x => {

    })
  }

  submitForm() {
    if (this.userForm.valid) {
      this.userService.Save(this.userForm.value).then(response => {
        this.messageService.add({ key: 'tst', severity: 'success', summary: "Usuario creado", detail: response.message });
        this.refreshData();
      }).catch((error) => {
        let errorMessage = 'Ocurrió un error inesperado';
        if (error.error?.errors) {
          errorMessage = Object.keys(error.error.errors)
            .map(key => error.error.errors[key].join(' '))
            .join(' ');
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }
        this.messageService.add({ key: 'tst', severity: 'error', summary: "Error", detail: errorMessage });
      });
    } else {
      this.messageService.add({ key: 'tst', severity: 'warn', summary: "Atención", detail: "Complete los campos requeridos" });
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';

      // Reglas de validación
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumber = /\d+/.test(value);
      const hasSpecialCharacter = /[@$!%*?&+]+/.test(value);
      const isValidLength = value.length >= 8;

      const errors: ValidationErrors = {};

      // Generar los errores individuales
      if (!hasUpperCase) {
        errors['uppercase'] = 'Debe contener al menos una letra mayúscula.';
      }

      if (!hasLowerCase) {
        errors['lowercase'] = 'Debe contener al menos una letra minúscula.';
      }

      if (!hasNumber) {
        errors['number'] = 'Debe contener al menos un número.';
      }

      if (!hasSpecialCharacter) {
        errors['specialCharacter'] = 'Debe contener al menos un carácter especial (@$!%*?&+).';
      }

      if (!isValidLength) {
        errors['minLength'] = 'Debe tener al menos 8 caracteres.';
      }

      return Object.keys(errors).length ? errors : null;
    };
  }

  refreshData(){
    this.userForm.reset();
    this.userForm.controls['status'].setValue(true);
  }
}
